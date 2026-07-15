const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

const LAUNCHER_FOLDER = path.join(
    process.env.APPDATA,
    'E5 Studios',
    'Eclipse Launcher'
)

const DOWNLOAD_FOLDER = path.join(
    LAUNCHER_FOLDER,
    'downloads'
)

const MODPACK_FOLDER = path.join(
    LAUNCHER_FOLDER,
    'instances',
    'Abystale'
)

const ZIP_FILE = path.join(
    DOWNLOAD_FOLDER,
    'Abystale.v1.0.0.zip'
)

const INSTALL_MARKER = path.join(
    MODPACK_FOLDER,
    'eclipse-installation.json'
)

function isModpackInstalled() {
    return fs.existsSync(INSTALL_MARKER)
}

function installModpackFromZip() {
    if (!fs.existsSync(ZIP_FILE)) {
        throw new Error('No se encontró el archivo ZIP de Abystale.')
    }

    fs.mkdirSync(MODPACK_FOLDER, {
        recursive: true
    })

    const zip = new AdmZip(ZIP_FILE)

    zip.extractAllTo(
        MODPACK_FOLDER,
        true
    )

    fs.writeFileSync(
        INSTALL_MARKER,
        JSON.stringify(
            {
                project: 'Abystale',
                version: '1.0.0',
                installedAt: new Date().toISOString()
            },
            null,
            2
        ),
        'utf8'
    )
}

function deleteDownloadedZip() {
    if (fs.existsSync(ZIP_FILE)) {
        fs.unlinkSync(ZIP_FILE)
    }
}

module.exports = {
    LAUNCHER_FOLDER,
    DOWNLOAD_FOLDER,
    MODPACK_FOLDER,
    ZIP_FILE,
    INSTALL_MARKER,
    isModpackInstalled,
    installModpackFromZip,
    deleteDownloadedZip
}