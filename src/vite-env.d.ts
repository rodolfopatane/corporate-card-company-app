/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FACTORY_ADDRESS: string;    
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}