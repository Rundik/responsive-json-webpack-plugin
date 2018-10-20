const ResponsiveJSONWebpackPlugin = require("../../src/index.ts")

const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates: "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates",
    sourceImages: "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\images",
    outputFolder: "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\__tests__\\examples\\output"
})

const dependencies = []
const compilation = {
    contextDependencies: new Set(),
    fileDependencies: new Set(),
    compiler: { context: "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\__tests__" }
}

describe("dependencies", () => {
        
    test("read directory", () => {
        rjInstance.readFolderDependencies(rjInstance.dirs.sourceTemplates, compilation.compiler.context, dependencies)
        expect(dependencies).toHaveLength(5)
    })

    test("get dependencies", () => {
        rjInstance.readFolderDependencies = jest.fn()
        rjInstance.readFolderDependencies.mockReturnValue(dependencies)
        expect(rjInstance.getDependencies(compilation)).toBe(dependencies)
        expect(compilation.contextDependencies.size).toBe(1)
        expect(compilation.fileDependencies.size).toBe(dependencies.length)
    })

    test("new dependencies", () => {
        expect(rjInstance.getChangedDependencies(dependencies)).toEqual({
            folders: {
                index: {
                    lastUpdate: 1539995571385,
                    filenames: [
                        "data\\icons.json",
                        "data\\_sample.json",
                        "images\\_sample.json"
                    ]
                },
                secondary: { 
                    lastUpdate: 1539982153928, 
                    filenames: ["data\\other.json"] 
                }
            },
            files: { 
                "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\pure.json": 1539124763943 
            },
            changedFolders: [
                "index", "secondary"
            ],
            changedPureFiles: [
                "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\pure.json"
            ]
        })

    })

    test("changed dependencies", () => {
        rjInstance.folders = {
            index: {
                lastUpdate: 1539995571385,
                filenames: [
                    "data\\icons.json",
                    "data\\_sample.json",
                    "images\\_sample.json"
                ]
            }
        }
        rjInstance.files = {
            "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\pure.json": 1539124763943
        }

        expect(rjInstance.getChangedDependencies(dependencies)).toEqual({
            "changedFolders": [
                "secondary"
            ],
            "changedPureFiles": [],
            "files": {
                "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\pure.json": 1539124763943
            },
            "folders": {
                "index": {
                    "filenames": [
                        "data\\icons.json",
                        "data\\_sample.json",
                        "images\\_sample.json"
                    ],
                    "lastUpdate": 1539995571385
                },
                "secondary": {
                    "filenames": [
                        "data\\other.json"
                    ],
                    "lastUpdate": 1539982153928
                }
            }
        })
    })
})