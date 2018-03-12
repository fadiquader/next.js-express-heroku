import Document, { Head, Main, NextScript } from 'next/document'
import flush, { flushToHTML } from "styled-jsx/server";

const isProd = process.env.NODE_ENV === 'production';

export default class DefaultDocument extends Document {
  static async getInitialProps (context) {
    const props = await super.getInitialProps(context);
    const { html, head, errorHtml, chunks } = context.renderPage();
    const styles = flush();

    return {
      ...props,
      html, head,
      errorHtml,
      chunks, styles
    }

  }

  render() {
    /**
    * Here we use _document.js to add a "lang" propery to the HTML object if
    * one is set on the page.
    **/
    const { dev, __NEXT_DATA__ } = this.props;
    let { assetPrefix } = __NEXT_DATA__
    const buildId  = !dev ? __NEXT_DATA__.buildId : null
    return (
      <html lang={'en'}>
        <Head>
          {!this.props.dev && (
            <link rel="stylesheet" href={`/_next/static/style-ant.css`} />
          )}
          <title>Andreas Test</title>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}