declare module "@joplin/turndown-plugin-gfm" {
    export const tables: import("turndown").Plugin;
    // https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts#:~:text=d.ts%20files%20are%20treated%20as%20an%20ambient%20module%20declarations%20only%20if%20they%20don%27t%20have%20any%20imports.%20If%20you%20provide%20an%20import%20line%2C%20it%27s%20now%20treated%20as%20a%20normal%20module%20file%2C%20not%20the%20global%20one%2C%20so%20augmenting%20modules%20definitions%20doesn%27t%20work.
}
