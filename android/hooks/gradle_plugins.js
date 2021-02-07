exports.id = 'gradle_plugins';
exports.cliVersion = '>=3.2';
exports.init = init;

const path = require('path');
const fs = require('fs');

/**
 * Main entry point for our plugin which looks for the platform specific
 * plugin to invoke.
 *
 * @param {Object} logger The logger instance.
 * @param {Object} config The hook config.
 * @param {Object} cli The Titanium CLI instance.
 * @param {Object} appc The Appcelerator CLI instance.
 */
// eslint-disable-next-line no-unused-vars
function init(logger, config, cli, appc) {
	cli.on('build.pre.build', {
		post: function () {
			// 1. Extend project-wide build.gradle
			const projectBuildGradle = path.resolve('./build/android/build.gradle');
			if (!fs.existsSync(projectBuildGradle)) { return; }

			const projectBuildGradleContents = fs.readFileSync(projectBuildGradle, 'utf-8').toString();
			const updatedProjectBuildGradleContents = projectBuildGradleContents
				.split('dependencies {').join('dependencies {\n\t\tclasspath \'com.google.firebase:firebase-crashlytics-gradle:2.4.1\'');

			fs.writeFileSync(projectBuildGradle, updatedProjectBuildGradleContents);
			
			// 2. Extend app-wide build.gradle
			const appBuildGradle = path.resolve('./build/android/app/build.gradle');
			if (!fs.existsSync(appBuildGradle)) { return; }

			const appBuildGradleContents = fs.readFileSync(appBuildGradle, 'utf-8').toString();
			const updatedAppBuildGradleContents = appBuildGradleContents
				.split('apply plugin: \'com.android.application\'').join('apply plugin: \'com.android.application\'\napply plugin: \'com.google.gms.google-services\'\napply plugin: \'com.google.firebase.crashlytics\'');

			fs.writeFileSync(appBuildGradle, updatedAppBuildGradleContents);
		}
	});
}
