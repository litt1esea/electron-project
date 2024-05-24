import pkgJSON from '../../package.json' assert {type: 'json'}

export default {
    APP_VERSION: pkgJSON.version,
    ENV_NOW: 'prod',
}