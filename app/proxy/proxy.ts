// import { OpenAIClient } from "./openai-client";
// import { OpenAIClientProxy } from "./openai-client-proxy";

// const client = new OpenAIClient();
// const proxy = new OpenAIClientProxy(client);

// const run = async () => {
//   await proxy.getResponse('FAQ2');  // Calls OpenAI
//   await proxy.getResponse('FAQ2');  // Returns cached
// };

// run();

async function wait() {
  console.log("before await - inside wait");
  const res = await Promise.resolve(1);
  console.log("after await - inside wait");
  return res;
}

async function foo() {
  const result1 = await new Promise((resolve) =>
    setTimeout(() => {
      console.log("before result1 resolve");
      // microtasks are executed as soon as the call stack is empty,
      // before another scheduled macrotask is pushed onto the call stack
      Promise.resolve(3).then((num) => console.log("resolved: ", num));
      resolve("1");
      console.log("after result1 resolve");
    })
  );
  console.log("result1: ", result1);
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve("2"))
  );
  console.log("result2: ", result2);
}

setTimeout(() => console.log('timeout before foo'))
foo();
setTimeout(() => console.log('timeout after foo'))

// console.log("before wait");
// const res = wait();
// console.log("after wait");
