Run

```bash
git checkout jest-repro
yarn
yarn test
```

And get something like

```bash
 RUNS  ./test.js
/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:3905
      var evt = document.createEvent('Event');
                         ^

TypeError: Cannot read property 'createEvent' of null
    at Object.invokeGuardedCallbackDev (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:3905:26)
    at invokeGuardedCallback (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:4056:31)
    at flushPassiveEffectsImpl (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:23543:11)
    at unstable_runWithPriority (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/scheduler/cjs/scheduler.development.js:468:12)
    at runWithPriority$1 (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:11276:10)
    at flushPassiveEffects (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom.development.js:23447:14)
    at Object.<anonymous>.flushWork (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom-test-utils.development.js:992:10)
    at Immediate.<anonymous> (/home/eps1lon/Development/throwaway/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom-test-utils.development.js:1003:11)
    at processImmediate (internal/timers.js:464:21)
```

To find the test that this error originates from easier, apply this patch

```bash
patch node_modules/react-dom/cjs/react-dom-test-utils.development.js < react-dom-test-utils.development.js.patch
yarn test
```

And now you get something like

```bash
 RUNS  ./test.js
/Users/user/Documents/repos/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom-test-utils.development.js:1010
      throw ex || err;
      ^

Test Failed: /Users/user/Documents/repos/react-testing-library-error-repro/test.js::it
    at Object.act (/Users/user/Documents/repos/react-testing-library-error-repro/node_modules/react-dom/cjs/react-dom-test-utils.development.js:1072:16)
    at /Users/user/Documents/repos/react-testing-library-error-repro/test.js:41:30
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
```

Environment:
```bash
$ npx envinfo
npx: installed 1 in 0.628s

  System:
    OS: Linux 5.13 Ubuntu 20.04.4 LTS (Focal Fossa)
    CPU: (16) x64 Intel(R) Core(TM) i9-9900K CPU @ 3.60GHz
    Memory: 20.32 GB / 31.29 GB
    Container: Yes
    Shell: 3.1.0 - /usr/bin/fish
  Binaries:
    Node: 14.18.3 - ~/.nvm/versions/node/v14.18.3/bin/node
    Yarn: 1.22.17 - ~/.nvm/versions/node/v14.18.3/bin/yarn
    npm: 6.14.15 - ~/.nvm/versions/node/v14.18.3/bin/npm
  Managers:
    Apt: 2.0.6 - /usr/bin/apt
    Cargo: 1.59.0 - ~/.cargo/bin/cargo
    pip3: 20.0.2 - /usr/bin/pip3
  Utilities:
    Make: 4.2.1 - /usr/bin/make
    GCC: 9.4.0 - /usr/bin/gcc
    Git: 2.25.1 - /usr/bin/git
    FFmpeg: 4.2.4 - /usr/bin/ffmpeg
  Virtualization:
    Docker: 20.10.14 - /usr/bin/docker
  IDEs:
    Nano: 4.8 - /usr/bin/nano
    VSCode: 1.66.2 - /usr/bin/code
  Languages:
    Bash: 5.0.17 - /usr/bin/bash
    Perl: 5.30.0 - /usr/bin/perl
    Python: 3.8.10 - /usr/bin/python
    Python3: 3.8.10 - /usr/bin/python3
    Rust: 1.59.0 - /home/eps1lon/.cargo/bin/rustc
  Browsers:
    Chrome: 100.0.4896.88
    Firefox: 99.0
```
