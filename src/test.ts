// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
//const context = require.context('./', true, /\.spec\.ts$/);
//const context = require.context('./', true, /my\.single\.file\.custom\.name\.spec\.ts$/);
//const context = require.context('./',true,/add-timetable\.component\.spec\.ts$/);
//const context = require.context('./',true,/edit-timetable\.component\.spec\.ts$/);
const context = require.context('./',true,/timetable\.service\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
