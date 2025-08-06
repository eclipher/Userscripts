<div align="center" width="100%">

# eclipher/Userscripts <!-- omit from toc -->

[English](/README.md) | **简体中文**

</div>

- [用户脚本列表](#用户脚本列表)
- [使用方法](#使用方法)
- [开发](#开发)
- [许可证](#许可证)

这是一个 [monorepo](https://en.wikipedia.org/wiki/Monorepo)。它包含了我开发的用户脚本的源代码以及相关的工具和组件。

## 用户脚本列表

- [LeetCode 工具箱](/userscripts/leetcode-toolkit/README-ZH.md)
    - 通过各种调整和添加来增强 LeetCode。它同时支持美国版LeetCode和中国版的力扣。
- [牛客网工具箱](userscripts/nowcoder-toolkit/README.md)
    - 保存牛客网练习题为Markdown 或 Jupyter Notebook.

## 使用方法

要使用用户脚本，您首先需要为您的浏览器安装一个用户脚本管理器，例如 [Tampermonkey](https://www.tampermonkey.net/)（适用于 Chrome、Firefox 和许多其他浏览器）。

之后，转到用户脚本在 GreasyFork 上的对应页面，然后单击“安装”按钮来安装脚本。

## 开发

该仓库使用 [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) 来开发和构建用户脚本。

1.  克隆仓库

2.  安装依赖

    ```sh
    cd path-to-repo
    pnpm install
    ```

3.  启动开发服务器

    ```sh
    pnpm -F name-of-script dev

    # Alternative
    cd path-to-repo/userscripts/path-to-script
    pnpm
    ```

4.  构建脚本

    ```sh
    pnpm -F name-of-script dev

    # Alternative
    cd path-to-repo/userscripts/path-to-script
    pnpm build
    ```

    构建后的文件将在 `dist` 目录下。

## 许可证

MIT
