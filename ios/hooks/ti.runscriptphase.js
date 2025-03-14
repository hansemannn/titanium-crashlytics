/* global __dirname */

const path = require('path');

exports.id = 'ti.runscriptphase';
exports.cliVersion = '>=5.0';

exports.init = function (logger, _, cli, appc) {
	cli.on('build.ios.xcodeproject', {
		pre: function (data) {
			const __ = appc.i18n(__dirname).__;
			const appName = cli.tiapp.name;
			const dsymPaths = path.join(cli.argv['project-dir'], 'build', 'iphone', 'build', 'Products', 'Release-iphoneos');
			const googleServiceFile = path.join(cli.argv['project-dir'], 'Resources', 'iphone', 'GoogleService-Info.plist');
			const scriptsFolder = path.join(cli.argv['project-dir'], 'scripts');
			const scriptArgs = `"${scriptsFolder}/run" -gsp "${googleServiceFile}" -p ios\n"${scriptsFolder}/upload-symbols" -gsp "${googleServiceFile}" -p ios "${path.join(`${dsymPaths}/${appName}.app.dSYM`)}"`;
			const xcodeProject = data.args[0];

			const builder = this;

			if (data.ctx.deployType !== 'production') {
				logger.debug(__('Skipping Crashlytics injection for non-production build …'));
				return;
			}

			var xobjs = xcodeProject.hash.project.objects;

			if (typeof builder.generateXcodeUuid !== 'function') {

				let uuidIndex = 1;
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

			if (builder.forceRebuild === false) {
				logger.debug(__('Skipping Crashlytics injection for incremental build …'));
				return;
			}

			addScriptBuildPhase(builder, xobjs, scriptArgs);
		}
	});
};

function addScriptBuildPhase(builder, xobjs, scriptArgs) {
	if (!scriptArgs) {
		return;
	}

	const script_uuid = builder.generateXcodeUuid();
	const shell_script = scriptArgs;

	const input_paths = `(
		"$\{DWARF_DSYM_FOLDER_PATH}/$\{DWARF_DSYM_FILE_NAME}",
		"$\{DWARF_DSYM_FOLDER_PATH}/$\{DWARF_DSYM_FILE_NAME}/Contents/Resources/DWARF/$\{PRODUCT_NAME}",
		"$\{DWARF_DSYM_FOLDER_PATH}/$\{DWARF_DSYM_FILE_NAME}/Contents/Info.plist",
		"$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/GoogleService-Info.plist",
		"$(TARGET_BUILD_DIR)/$(EXECUTABLE_PATH)"
	)`;

	createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_script, input_paths);
	createPBXRunScriptNativeTarget(xobjs, script_uuid);
}

function createPBXRunShellScriptBuildPhase(xobjs, script_uuid, shell_script, input_paths) {
	xobjs.PBXShellScriptBuildPhase = xobjs.PBXShellScriptBuildPhase || {};

	xobjs.PBXShellScriptBuildPhase[script_uuid] = {
		isa: 'PBXShellScriptBuildPhase',
		buildActionMask: '2147483647',
		files: '(\n)',
		inputPaths: input_paths,
		outputPaths: '(\n)',
		runOnlyForDeploymentPostprocessing: 0,
		shellPath: '/bin/sh',
		name: '"[Ti] Crashlytics"',
		shellScript: JSON.stringify(shell_script)
	};
}

function createPBXRunScriptNativeTarget(xobjs, script_uuid) {
	for (const key in xobjs.PBXNativeTarget) {
		xobjs.PBXNativeTarget[key].buildPhases.push({
			value: script_uuid + '',
			comment: '[Ti] Crashlytics'
		});
		return;
	}
}
