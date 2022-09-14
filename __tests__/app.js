"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wordpress-theme-gulp-3-9-0:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["dummyfile.txt"]);
  });
});
