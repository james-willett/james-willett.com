declare module '*.less' {
  var less: { [className: string]: string }
  export default less
}

declare module '*.svg' {
  var ReactComponent: React.SFC<React.HTMLProps<SVGElement>>
  export { ReactComponent }
}

// https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
//declare module '*' // this declares everything! probably need to remove this later -
