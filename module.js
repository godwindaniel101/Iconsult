var fs = require("fs");
var dir_name = process.argv[2];

if (dir_name != null) {
  var dir_base = `./src/module/${dir_name}`;

  var controller = ` `;

  var schema = ` `;

  var model = ` `;

  var type = ` `;

  var service = ` `;

  fs.exists(dir_base, (e) => {
    if (!e) {
      fs.mkdir(dir_base, { recursive: true }, (err) => {
        if (err) throw err;
        fs.writeFileSync(`${dir_base}/controller.ts`, controller, (e) => {
          console.log("controller created");
        });
        fs.writeFileSync(`${dir_base}/schema.ts`, schema, (e) => {
          console.log("schema created");
        });
        fs.writeFileSync(`${dir_base}/model.ts`, model, (e) => {
          console.log("model created");
        });
        fs.writeFileSync(`${dir_base}/type.ts`, type, (e) => {
          console.log("type created");
        });
        fs.writeFileSync(`${dir_base}/service.ts`, service, (e) => {
          console.log("services created");
        });
      });
    } else {
      console.log("module Already exist");
    }
  });
} else {
  console.log("provide a valid module name");
}
