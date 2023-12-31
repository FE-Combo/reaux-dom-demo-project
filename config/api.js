const generate = require('yapi-ts-engine');

generate({
  serverUrl: 'https://yapi.pro',
  projectId: '99',
  servicePath: '/src/services',
  requestImportExpression: "import ajax, {BaseResult} from 'utils/ajax';",
  hiddenBodyInGET: true,
  apiRename: (name) => {
    return name.replace(/^(\/v1\.\w\/demo)/, '').replace(/\.\w\/demo/, '');
  },
  hiddenTypes: ['headers'],
  responseType: (type) => {
    return `BaseResult<${type}>`;
  },
  additionalPageHeader: `/*
  Attention: This file is generated by "yarn api", do not modify
*/\n`
});
