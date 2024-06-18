/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface IVscode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMessage(message: any): void
}
// declare function acquireVsCodeApi(): vscode;
declare let vscode: IVscode

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vscode: any
}
