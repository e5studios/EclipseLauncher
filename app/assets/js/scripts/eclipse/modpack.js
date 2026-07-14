const fs = require('fs')
const path = require('path')

const MODPACK_FOLDER = path.join(
    process.env.APPDATA,
    'E5 Studios',
    'Eclipse Launcher',
    'instances',
    'Abystale'
)

const TEST_FILE = path.join(
    MODPACK_FOLDER,
    'installation-test.txt'
)

function isModpackInstalled() {
    return fs.existsSync(MODPACK_FOLDER)
}

function installTestModpack() {
    fs.mkdirSync(MODPACK_FOLDER, {
        recursive: true
    })

    fs.writeFileSync(
        TEST_FILE,
        'Instalación de prueba completada por Eclipse Launcher.',
        'utf8'
    )
}

module.exports = {
    MODPACK_FOLDER,
    isModpackInstalled,
    installTestModpack
}