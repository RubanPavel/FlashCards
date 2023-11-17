import{j as n}from"./jsx-runtime-ffb262ed.js";import{r as p}from"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const C="_inputContainer_1w9nu_30",b="_input_1w9nu_30",v="_error_1w9nu_65",o={inputContainer:C,input:b,error:v},r=e=>{const{className:t,disabled:a,errorMessage:x,label:S,onChangeValue:j,search:w,type:N,value:f,...y}=e;return n.jsx("div",{"aria-disabled":a,className:o.container,children:n.jsx("div",{className:o.wrapper,children:n.jsx("input",{className:`${o.input}`,disabled:a,value:f,...y})})})};try{r.displayName="Input",r.__docgenInfo={description:"",displayName:"Input",props:{errorMessage:{defaultValue:null,description:"",name:"errorMessage",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},onChangeValue:{defaultValue:null,description:"",name:"onChangeValue",required:!1,type:{name:"((value: string) => void)"}},search:{defaultValue:null,description:"",name:"search",required:!1,type:{name:"boolean"}}}}}catch{}const R={component:r,tags:["autodocs"],title:"Components/Input"},s=({...e})=>{const[t,a]=p.useState("");return n.jsx(r,{...e,onChangeValue:a,value:t})};s.args={disabled:!1,label:"Input",placeholder:"Input"};const u=({...e})=>{const[t,a]=p.useState("");return n.jsx(r,{...e,onChangeValue:a,type:"password",value:t})};u.args={disabled:!1,label:"Input",placeholder:"Input"};const l=({...e})=>{const[t,a]=p.useState("");return n.jsx(r,{...e,onChangeValue:a,search:!0,value:t})};l.args={disabled:!1,label:"Input",placeholder:"Input"};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`({
  ...args
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return <Input {...args} onChangeValue={setInputValue} value={inputValue} />;
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,g,V;u.parameters={...u.parameters,docs:{...(m=u.parameters)==null?void 0:m.docs,source:{originalSource:`({
  ...args
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return <Input {...args} onChangeValue={setInputValue} type={'password'} value={inputValue} />;
}`,...(V=(g=u.parameters)==null?void 0:g.docs)==null?void 0:V.source}}};var I,h,_;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`({
  ...args
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  return <Input {...args} onChangeValue={setInputValue} search value={inputValue} />;
}`,...(_=(h=l.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};const P=["Primary","InputWithIconRight","SearchInput"];export{u as InputWithIconRight,s as Primary,l as SearchInput,P as __namedExportsOrder,R as default};
//# sourceMappingURL=input.stories-a4c36f40.js.map
