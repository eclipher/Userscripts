<div align="center" width="100%">

# 牛客网工具箱 <!-- omit from toc -->

<a href="https://greasyfork.org/scripts/537724"><img alt="Greasy Fork License" src="https://img.shields.io/greasyfork/v/537724"></a>
![Greasy Fork License](https://img.shields.io/greasyfork/l/537724)

</div>

- [特性](#特性)
  - [在线编程/练习](#在线编程练习)
- [关于 Jupyter Notebook](#关于-jupyter-notebook)
- [安装](#安装)
- [许可证](#许可证)

## 特性

该用户脚本通过各种调整和添加增强了[牛客网](https://www.nowcoder.com/)。

### 在线编程/练习

- 在问题描述选项卡上，添加了以下按钮：
    - **复制描述：** 以 Markdown 格式复制问题描述。非常适合粘贴到笔记中或咨询 AI 助手。
    - **保存为 Jupyter Notebook:** 将问题标题、描述（Markdown）和代码编辑器的当前内容捆绑到一个 `.ipynb` 文件中。更多详情，请参阅[关于 Jupyter Notebook](#关于-jupyter-notebook) 部分。

## 关于 Jupyter Notebook

[Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/latest/)是一个开源 Web 应用程序，允许你创建和共享包含实时代码、公式、可视化和叙述文本的文档。

“保存为 Jupyter Notebook” 功能可以帮助你将牛客题目转换成 Jupyter Notebook 文档，这样你就可以在本地机器上的同一处阅读题目、编写和运行解决方案、添加额外注释。

你可以使用诸如 [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) 之类的客户端打开`.ipynb` 笔记本。默认情况下，它支持 Python，但也提供[许多其他语言的内核](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels)。

## 安装

要使用此用户脚本，你需要一个像 [Tampermonkey](https://www.tampermonkey.net/) 这样的用户脚本管理器（适用于 Chrome、Firefox 和其他浏览器）。

1. 为你的浏览器安装 Tampermonkey 或类似的用户脚本管理器。
2. 前往 [GreasyFork 页面](https://greasyfork.org/zh-CN/scripts/537724)，点击“安装此脚本”按钮。
3. 访问[一个牛客网练习题页面](https://www.nowcoder.com/practice/650474f313294468a4ded3ce0f7898b9)，你应该会看到此脚本添加的新功能。

## 许可证

MIT
