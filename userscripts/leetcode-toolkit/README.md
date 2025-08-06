<div align="center" width="100%">

# LeetCode Toolkit <!-- omit from toc -->

**English** | [简体中文](./README-ZH.md)

<a href="https://greasyfork.org/en/scripts/532158"><img alt="Greasy Fork License" src="https://img.shields.io/greasyfork/v/532158"></a>
![Greasy Fork License](https://img.shields.io/greasyfork/l/532158)

</div>

- [Features](#features)
  - [Problem Page](#problem-page)
  - [Explore Cards](#explore-cards)
- [Screenshots](#screenshots)
- [About Editorial Scraping](#about-editorial-scraping)
- [About Jupyter Notebook](#about-jupyter-notebook)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Features

This userscript enhances the LeetCode with various tweaking and additions. It supports both the US version of [LeetCode.com](https://leetcode.com), and [the China version](https://leetcode.cn).

### Problem Page

- On **Description** Tab:
    - **Copy Title**: For some reason the problem title is an unclickable link, and you can't simply double click it to select the text. This button will copy the title to your clipboard.
    - **Copy Description:** Copy the problem description in Markdown format. Ideal for pasting into into your notes, or for asking an AI assistant.
    - **Save as Jupyter Notebook:** Bundles the problem title, description in Markdown, and the current code you have into a single `.ipynb` file. See [About Jupyter Notebook](#about-jupyter-notebook) section for more detail.
    - A **difficulty rating(\*\*)** of the problem (if one exists) will be displayed in addition to the original difficulty label, offering a more accurate evaluation than "easy" "medium" "hard" labels. The source of the ratings is [Leetcode Problem Rating Project](https://github.com/zerotrac/leetcode_problem_rating).

- On **Editorial** Tab:
    - **Find Screenshot(\*):** If you don't have access to an editorial, click on this button to try to find a screenshot of the editorial. If found, it will open the link to the screenshot. The source of the screenshots is [Leetcode Screenshotter](https://github.com/akhilkammila/leetcode-screenshotter).
    - **Save Editorial as Markdown(\*)**: If you _do_ have access to an editorial, click on this button and the script will scrape the editorial and download it as one single `.md` file. See [About Editorial Scraping](#about-editorial-scraping) section for more detail.

- The **code editor** receives some quality-of-life adjustments:
    - **Format On Save:** Automatically format code when pressing <kbd>Ctrl + S</kbd>.
    - **Unlock IntelliSense:** Enjoy autocompletion and hover suggestions without paying for premium.

### Explore Cards

- **Save Article as Markdown(\*)**: Scrape and download an Explore Card article as markdown file. See [About Editorial Scraping](#about-editorial-scraping) section for more detail.

> (\*) These features are for US site only.
>
> (\*\*) This feature relies on Tampermonkey's [window.onurlchange](https://www.tampermonkey.net/documentation.php#api:window.onurlchange) API. If you're using a different userscript manager that doesn't support this API, the rating may not update correctly when you navigate between problems without a full page reload.

## Screenshots

<table>
    <tr>
        <td>
            <figure>
                <img src="assets/screenshot-1.png" />
                <figcaption>Copy title and description of a problem, or save as Jupyter Notebook</figcaption>
            </figure>
        </td>
        <td>
            <figure>
                <img src="assets/screenshot-2.png" />
                <figcaption>Find screenshot of editorial or save it as markdown</figcaption>
            </figure>
        </td>
        <td>
            <figure>
                <img src="assets/screenshot-5.png" />
                <figcaption>Save explore card article as markdown</figcaption>
            </figure>
        </td>
    </tr>
    <tr>
        <td>
            <figure>
                <img src="assets/screenshot-4.png" />
                <figcaption>IntelliSense in the code editor</figcaption>
            </figure>
        </td>
        <td>
            <figure>
                <img src="assets/screenshot-3.png" />
                <figcaption>
                    View problem, write and run code, and add additional notes directly in a Jupyter notebook (with VS Code)
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

## About Editorial Scraping

LeetCode editorial articles contains codes, slides, videos, math expressions and so on. You can use any Markdown readers to view the scraped `.md` files, but I developed a dedicated [LeetCode Editorial Reader](https://leetcode-editorial-reader.vercel.app/) app to view them in best layout.

A few things to notice:

- **Codes**: will be saved as multiple code blocks in different languages. [LeetCode Editorial Reader](https://leetcode-editorial-reader.vercel.app/) can display them in tab layout.
- **Slides** will be saved as a series of images. [LeetCode Editorial Reader](https://leetcode-editorial-reader.vercel.app/) can display them in true slide layout.
- Speaking of **images**, they will be compressed and saved as Base64-encoded string, which means they will be directly inside the markdown file without the risk of "image not found". (This also makes the file larger though.)
- **Math** expressions will be saved, but you may need compatible viewers such as VS Code or [LeetCode Editorial Reader](https://leetcode-editorial-reader.vercel.app/) to render them correctly.
- Videos **will not be** saved. That's a headache I don't want to deal with.

## About Jupyter Notebook

[Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/latest/) is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text.

The `Save as Jupyter Notebook` feature helps you transfer LeetCode problems into a Jupyter Notebook document, so you can read the problem, write and run the solution, add additional notes, all at one place on your local machine.

You can open `.ipynb` notebooks with clients such as [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks). By default it supports Python, but [kernels for many other languages](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) are available too.

## Installation

To use this userscript, you'll need a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) (available for Chrome, Firefox, and other browsers).

1. Install Tampermonkey or a similar userscript manager for your browser.
2. Go to [the GreasyFork Page](https://greasyfork.org/en/scripts/532158), and click on the "Install this script" button.
3. Visit [a LeetCode problem page](https://leetcode.com/problems/two-sum/), and you should see the new features added by the script.

## Credits

This script is inspired by the following projects:

- [Leetcode Screenshotter](https://github.com/akhilkammila/leetcode-screenshotter)
- [LeetCode Problem to Markdown](https://greasyfork.org/en/scripts/448601)
- [leetcode enhanced code editor](https://greasyfork.org/en/scripts/502740-leetcode-enhanced-code-editor)
- [Leetcode: format on save](https://greasyfork.org/en/scripts/481927-leetcode-format-on-save)
- [leetcode-difficulty-rating-extension](https://github.com/boenshao/leetcode-difficulty-rating-extension)

## License

MIT License
