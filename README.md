<div align="center" width="100%">

# eclipher/Userscripts <!-- omit from toc -->

**English** | [简体中文](/README-ZH.md)

</div>

- [eclipher/Userscripts](#eclipheruserscripts)
    - [List of Userscripts](#list-of-userscripts)
    - [Usage](#usage)
    - [Development](#development)
    - [License](#license)

## List of Userscripts

- [LeetCode Toolkit](/userscripts/leetcode-toolkit/README.md)
    - Enhance LeetCode with various tweaking and additions. It supports both the US version of LeetCode.com, and the China version.
- [NowCoder Toolkit](userscripts/nowcoder-toolkit/README.md)
    - Save NowCoder.com practice problems in markdown or Jupyter Notebook.

## Usage

To use a userscript, you'll first need to install a userscript manager for your browser, such as [Tampermonkey](https://www.tampermonkey.net/) (available for Chrome, Firefox, and many other browsers).

After that, go to the respective GreasyFork page of the userscript, and click on the Install button to install the script.

## Development

This repo utilizes [vite-plugin-monkey](https://github.com/lisonge/vite-plugin-monkey) to develop and build the userscripts.

1. Clone the repo

2. Install dependencies

    ```sh
    cd path-to-repo
    pnpm install
    ```

3. Start development server

    ```sh
    pnpm -F name-of-script dev

    # Alternative
    cd path-to-repo/userscripts/path-to-script
    pnpm
    ```

4. Build the script

    ```sh
    pnpm -F name-of-script dev

    # Alternative
    cd path-to-repo/userscripts/path-to-script
    pnpm build
    ```

    The built file will be under `dist` directory.

## License

MIT
