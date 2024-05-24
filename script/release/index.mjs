import { build } from "vite"
import path from 'path'
import vue from '@vitejs/plugin-vue'

import env from './env.mjs'
import {readFileSync, writeFileSync } from 'fs'



async function buildRender() {

    const options = {
        root: process.cwd(),
        build: {
            enableEsbuild: true,
            minify: true,
            outDir: path.join(process.cwd(), 'release/bundled')
        },
        
        plugins: [vue()],
    }


    await build(options)    
}


function getEnvScript() {
    
    let script = "";
    for (let v in env) {
        script += `process.env.${v}='${env[v]}';`;
    }
    script += 'process.env.RES_DIR = process.resourcesPath';
    return script;
}

buildRender()