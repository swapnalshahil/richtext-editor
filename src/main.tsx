import React from "react";
import ReactDOM from "react-dom";
import { RichTextEditor } from "./index";

const getUrlforMedia = async(prop: any) => {
  return await URL.createObjectURL(prop);
}
const candidates: any = [
  { label: "aws", id: 0 },
  { label: "awsd", id: 1 },
  { label: "awsdf", id: 2 },
  { label: "awsdfb", id: 3 },
  { label: "awsdfb", id: 4 },
  { label: "awsdf", id: 5 },
  { label: "awsdf", id: 6 },
]

const Root = () => {
  return (
    <RichTextEditor dropDownAPI={(props) => { return candidates}} getUrlforMedia={getUrlforMedia} />
  )
}

ReactDOM.render(<Root />, document.getElementById("root"));
