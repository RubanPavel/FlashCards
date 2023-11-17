import{j as r}from"./jsx-runtime-ffb262ed.js";import{r as E}from"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const $="_primary_19pif_1",M="_secondary_19pif_49",Z="_tertiary_19pif_97",R="_link_19pif_146",z="_fullWidth_19pif_191",g={primary:$,secondary:M,tertiary:Z,link:R,fullWidth:z},s=e=>{const{as:a="button",className:p,fullWidth:m,variant:y="primary",...h}=e;return r.jsx(a,{className:`${g[y]} ${m?g.fullWidth:""} ${p}`,...h})};try{s.displayName="Button",s.__docgenInfo={description:"",displayName:"Button",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"ElementType"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"link"'},{value:'"primary"'},{value:'"secondary"'},{value:'"tertiary"'}]}}}}}catch{}const o=e=>{const{color:a="var(--color-light-100)",fill:p="none",height:m=24,strokeWidth:y=2,width:h=24,...T}=e;return r.jsxs("svg",{fill:p,height:m,viewBox:"0 0 24 24",width:h,xmlns:"http://www.w3.org/2000/svg",...T,children:[r.jsx("path",{d:"M7 6C7.26522 6 7.51957 5.89464 7.70711 5.70711C7.89464 5.51957 8 5.26522 8 5C8 4.73478 7.89464 4.48043 7.70711 4.29289C7.51957 4.10536 7.26522 4 7 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H7C7.26522 20 7.51957 19.8946 7.70711 19.7071C7.89464 19.5196 8 19.2652 8 19C8 18.7348 7.89464 18.4804 7.70711 18.2929C7.51957 18.1054 7.26522 18 7 18H6V6H7Z",fill:a}),r.jsx("path",{d:"M20.82 11.42L18 7.42C17.8471 7.20441 17.615 7.05814 17.3545 7.01317C17.0941 6.9682 16.8264 7.02818 16.61 7.18C16.5018 7.25579 16.4098 7.35224 16.3391 7.46381C16.2684 7.57537 16.2206 7.69982 16.1982 7.82999C16.1759 7.96015 16.1796 8.09344 16.2091 8.22217C16.2386 8.3509 16.2933 8.47252 16.37 8.58L18.09 11H10C9.73478 11 9.48043 11.1054 9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13H18L16.2 15.4C16.1212 15.5051 16.0639 15.6246 16.0313 15.7518C15.9987 15.879 15.9915 16.0114 16.01 16.1414C16.0286 16.2714 16.0726 16.3965 16.1395 16.5095C16.2064 16.6225 16.2949 16.7212 16.4 16.8C16.5731 16.9298 16.7836 17 17 17C17.1552 17 17.3084 16.9639 17.4472 16.8944C17.5861 16.825 17.7069 16.7242 17.8 16.6L20.8 12.6C20.9281 12.4309 20.999 12.2254 21.0026 12.0133C21.0062 11.8011 20.9423 11.5934 20.82 11.42Z",fill:a})]})};E.memo(o);try{o.displayName="IconLogOut",o.__docgenInfo={description:"",displayName:"IconLogOut",props:{color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"number"}},strokeWidth:{defaultValue:null,description:"",name:"strokeWidth",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"number"}}}}}catch{}const J={argTypes:{variant:{control:{type:"radio"},options:["primary","secondary","tertiary","link"]}},component:s,tags:["autodocs"],title:"Components/Button"},i={args:{children:"Primary Button",disabled:!1,variant:"primary"}},t=({disabled:e,...a})=>r.jsx(s,{...a,disabled:e,children:r.jsxs(r.Fragment,{children:[r.jsx(o,{color:e?"var(--color-light-900)":"var(--color-light-100)",height:16,width:16}),"Primary Button"]})});t.args={disabled:!1,variant:"primary"};const l={args:{children:"Secondary Button",disabled:!1,variant:"secondary"}},n=({disabled:e,...a})=>r.jsx(s,{...a,disabled:e,children:r.jsxs(r.Fragment,{children:[r.jsx(o,{color:e?"var(--color-light-900)":"var(--color-light-100)",height:16,width:16}),"Secondary Button"]})});n.args={disabled:!1,variant:"secondary"};const d={args:{children:"Tertiary Button",disabled:!1,variant:"tertiary"}},c={args:{as:"a",children:"Link Button",disabled:!1,variant:"link"}},u={args:{children:"Full Width Button",disabled:!1,fullWidth:!0,variant:"primary"}};var f,v,C;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary'
  }
}`,...(C=(v=i.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var _,b,B;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`({
  disabled,
  ...args
}: {
  disabled: boolean;
} & ButtonProps) => {
  return <Button {...args} disabled={disabled}>
      <>
        <IconLogOut color={disabled ? 'var(--color-light-900)' : 'var(--color-light-100)'} height={16} width={16} />
        Primary Button
      </>
    </Button>;
}`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var W,x,S;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary'
  }
}`,...(S=(x=l.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var k,L,j;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`({
  disabled,
  ...args
}: {
  disabled: boolean;
} & ButtonProps) => {
  return <Button {...args} disabled={disabled}>
      <>
        <IconLogOut color={disabled ? 'var(--color-light-900)' : 'var(--color-light-100)'} height={16} width={16} />
        Secondary Button
      </>
    </Button>;
}`,...(j=(L=n.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};var w,I,V;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    children: 'Tertiary Button',
    disabled: false,
    variant: 'tertiary'
  }
}`,...(V=(I=d.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var P,q,N;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    as: 'a',
    children: 'Link Button',
    disabled: false,
    variant: 'link'
  }
}`,...(N=(q=c.parameters)==null?void 0:q.docs)==null?void 0:N.source}}};var F,H,O;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary'
  }
}`,...(O=(H=u.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};const K=["Primary","PrimaryWithIcon","Secondary","SecondaryWithIcon","Tertiary","Link","FullWidth"];export{u as FullWidth,c as Link,i as Primary,t as PrimaryWithIcon,l as Secondary,n as SecondaryWithIcon,d as Tertiary,K as __namedExportsOrder,J as default};
//# sourceMappingURL=button.stories-29da06f5.js.map
