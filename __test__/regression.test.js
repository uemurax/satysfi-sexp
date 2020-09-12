const shell = require("shelljs");
const tmp = require("tmp");

shell.cd("__test__");

afterAll(() => {
    shell.rm("test.pdf", "test.satysfi-aux");
});

test("SATySFi is installed", () => {
    expect(shell.exec("satysfi --version").code).toBe(0);
});

test("Compiler outputs", () => {
    const compilerOutput = shell
          .exec("satysfi test.saty")
          .exec("awk '/evaluating texts .../{flag=1;next}/evaluation done/{flag=0}flag'")
          .stdout;
    expect(compilerOutput).toMatchSnapshot();
});
