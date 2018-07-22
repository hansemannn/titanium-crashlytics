
exports.id = 'ti.runscriptphase';
exports.cliVersion = '>=5.0';

exports.init = function (logger, config, cli, appc) {
	cli.on('build.ios.xcodeproject', {
		pre: function (data) {
			const scriptPath = '../../scripts/script-titanium-crashlytics.sh'

			const builder = this;
			const xcodeProject = data.args[0];

			var xobjs = xcodeProject.hash.project.objects;

			if (typeof builder.generateXcodeUuid !== 'function') {
				const uuidIndex = 1;
				const uuidRegExp = /^(0{18}\d{6})$/;
				const lpad = appc.string.lpad;

				Object.keys(xobjs).forEach(function (section) {
					Object.keys(xobjs[section]).forEach(function (uuid) {
						const m = uuid.match(uuidRegExp);
						const n = m && parseInt(m[1]);
						if (n && n > uuidIndex) {
							uuidIndex = n + 1;
						}
					});
				});

				builder.generateXcodeUuid = function generateXcodeUuid() {
					return lpad(uuidIndex++, 24, '0');
				};
			}
			addScriptBuildPhase(builder, xobjs, scriptPath, appc);
		}
	});
};

function addScriptBuildPhase(builder, xobjs, scriptPath, appc) {
	if (!scriptPath) return;
	
	const script_uuid = builder.generateXcodeUuid();
	const shell_path = '/bin/sh';
	const shell_script = 'bash \"' + scriptPath + '\"';

	constructInputPaths(appc, function (input_paths) {
		createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_path, shell_script, input_paths);
		createPBXRunScriptNativeTarget(xobjs, script_uuid);
	});
}

function constructInputPaths(appc, cb) {
	appc.subprocess.run('/usr/bin/xcodebuild', [ '-version' ], function (code, result) {
		const xcodeVersion = result.substring(result.indexOf('Xcode ') + 6, result.indexOf('\n'));
		const isXcode10 = appc.version.gte(xcodeVersion, '10.0.0')

		// Xcode 10+ needs to inject the Info.plist in the "Input Files" section of the Script Phase
		if (isXcode10) {
			cb('(\n\t"$(BUILT_PRODUCTS_DIR)/$(INFOPLIST_PATH)"\n)')
		} else {
			cb('(\n)');
		}	
	});
}

function createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_path, shell_script, input_paths) {
	xobjs.PBXShellScriptBuildPhase = xobjs.PBXShellScriptBuildPhase || {};
  
	xobjs.PBXShellScriptBuildPhase[script_uuid] = { 
 		isa: 'PBXShellScriptBuildPhase', 
 		buildActionMask: '2147483647', 
 		files: '(\n)', 
 		inputPaths: input_paths, 
 		outputPaths: '(\n)', 
 		runOnlyForDeploymentPostprocessing: 0, 
 		shellPath: shell_path, 
 		shellScript: JSON.stringify(shell_script) 
 	};
}

function createPBXRunScriptNativeTarget(xobjs, script_uuid) {
	for (const key in xobjs.PBXNativeTarget) {
		xobjs.PBXNativeTarget[key].buildPhases.push({ 
        		value: script_uuid + '', 
        		comment: 'Run Script Phase'
      		});
		return;
	}
}
