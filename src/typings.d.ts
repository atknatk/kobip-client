/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var System: any;

declare var require: any;

interface Window {
  readonly $: JQuery;
}
