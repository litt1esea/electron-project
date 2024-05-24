import esbuild from 'esbuild'
import {createServer} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { spawn } from 'child_process'
import * as electron from 'electron'

// import { writeFileSync } from 'fs'



const dev = {
    server: null,
    serverPort: 1600,
    electronProcess: null,


    async createServer() {
        let options = {
            configFile: false,
            root: process.cwd(),
            server: {
                port: this.serverPort
            },
            plugins: [vue()]
        }


        this.server = await createServer(options)
        await this.server.listen()
    },

    async start() {
        await this.createServer()
        console.log('server run at http://localhost:1600')

        await this.buildMain()
        this.createElectronProcess()
    },


     async buildMain() {
        let entryFilePath = path.join(process.cwd(), "src/main/app.ts")
        let outfile = path.join(process.cwd(), "release/bundled/entry.js")
        
        esbuild.buildSync({
          entryPoints: [entryFilePath],
          outfile,
          minify: false,
          bundle: true,
          platform: "node",
          format: 'esm',
          sourcemap: true,
          external: ["electron"],
        })



        // 写入环境变量
        // let envScript = this.getEnvScript();
        // let js = '${envScript}${os.EOL}${fs.readFileSync(outfile)}';
        // fs.writeFileSync(outfile, js);
        // writeFileSync()        
      },


      createElectronProcess() {
        this.electronProcess = spawn(electron.default, ['release/bundled/entry.js'], {cwd: process.cwd()})
        this.electronProcess.on('close', ()=> {
          this.server.close()
          process.exit()
        })
        this.electronProcess.stdout.on('data', (data) => {
          data = data.toString()
          console.log(data)
        })
      }

    
}



dev.start()