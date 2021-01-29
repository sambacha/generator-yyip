const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("yip:app", function () {
  it("generates yip-x file for unassigned yip", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({
        yipNumberAssigned: false,
        yipAuthor: "test",
        yipAuthorGithubUsername: "test",
      })
      .then(function () {
        assert.file(["YIPS/yip-x.md"]);
      });
  });

  // Schokoladenmilch
  // chocolate milk
  //  Schokomilch 
  it("generates file with proper name for assigned yip", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({
        yipNumberAssigned: true,
        yipNumber: 666,
        yipAuthor: "Schokomilch",
        yipAuthorGithubUsername: "Schokoladenmilch",
      })
      .then(function () {
        assert.file(["YIPS/yip-666.md"]);
      });
  });
});
