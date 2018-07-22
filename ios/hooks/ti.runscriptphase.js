
exports.id = 'ti.runscriptphase';
exports.cliVersion = '>=5.0';

exports.init = function (logger, config, cli, appc) {
	cli.on('build.ios.xcodeproject', {
		pre: function (data) {
			
			var scriptPath = '../../scripts/script-titanium-crashlytics.sh'

			var builder = this;
			var xcodeProject = data.args[0];
			var xobjs = xcodeProject.hash.project.objects;

			if (typeof builder.generateXcodeUuid !== 'function') {
				var uuidIndex = 1;
				var uuidRegExp = /^(0{18}\d{6})$/;
				var lpad = appc.string.lpad;

				Object.keys(xobjs).forEach(function (section) {
					Object.keys(xobjs[section]).forEach(function (uuid) {
						var m = uuid.match(uuidRegExp);
						var n = m && parseInt(m[1]);
						if (n && n > uuidIndex) {
							uuidIndex = n + 1;
						}
					});
				});

				builder.generateXcodeUuid = function generateXcodeUuid() {
					return lpad(uuidIndex++, 24, '0');
				};
			}
			addScriptBuildPhase(builder, xobjs, scriptPath);
		}
	});
};

function addScriptBuildPhase(builder, xobjs, scriptPath) {
	if (!scriptPath) return;
	
	var script_uuid = builder.generateXcodeUuid();
	var shell_path = '/bin/sh';
	var shell_script = 'bash \"' + scriptPath + '\"';

	createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_path, shell_script);
	createPBXRunScriptNativeTarget(xobjs, script_uuid);
}

function createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_path, shell_script){
	xobjs.PBXShellScriptBuildPhase = xobjs.PBXShellScriptBuildPhase || {};
  
	xobjs.PBXShellScriptBuildPhase[script_uuid] = { 
 		isa: 'PBXShellScriptBuildPhase', 
 		buildActionMask: '2147483647', 
 		files: '(\n)', 
 		inputPaths: '(\n)', 
 		outputPaths: '(\n)', 
 		runOnlyForDeploymentPostprocessing: 0, 
 		shellPath: shell_path, 
 		shellScript: JSON.stringify(shell_script) 
 	};
}

function createPBXRunScriptNativeTarget(xobjs, script_uuid) {
	for (var key in xobjs.PBXNativeTarget) {
		xobjs.PBXNativeTarget[key].buildPhases.push({ 
        		value: script_uuid + '', 
        		comment: 'Run Script Phase'
      		});
		return;
	}
}
