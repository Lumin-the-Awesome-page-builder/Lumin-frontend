import {App} from "@/editor/App";
import Container from "@/editor/components/Container";

const jsonData = JSON.stringify([
  {
    key: "data-123-div-1729624518542",
    name: "container",
    attrs: [{name: "class", value: "row"}],
    props: [],
    content: null,
    children: [
      {
        key: "data-123-div-1729624518123",
        name: "container",
        attrs: [{name: "class", value: "col"}],
        props: [],
        content: "Test content"
      },
      {
        key: "data-123-div-1729624518545",
        name: "container",
        attrs: [{name: "class", value: "col"}],
        props: [],
        content: "Test content"
      }
    ]
  }
])

const app = new App()

app.use("container", Container)

export default function mount(root: string, identifiersSalt: string, json: string = jsonData): App {
  app.init(root, identifiersSalt, JSON.parse(json))

  app.run()

  return app
}