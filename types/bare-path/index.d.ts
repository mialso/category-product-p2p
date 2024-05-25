declare module 'bare-path' {
    type BarePath = {
        join: (a: string, b: string) => string
    };

    const path: BarePath;
    export default path;
}
