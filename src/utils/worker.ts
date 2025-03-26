
export function WebWorker(url: string, type: 'classic' | 'module' = 'module') {
    // origin
    const workerUrl = new URL(
        `/${url}`,
        import.meta.url
    );
    return new Worker(
        workerUrl, 
        {type}
    );
}
