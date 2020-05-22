const webpack = require("webpack");
//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { store } = require(`./node_modules/gatsby/dist/redux`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve("./src/templates/PostTemplate.js");
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    let redirects = [
      {
        f: "/2018/04/add-redux-middleware-dynamically/",
        t: "/add-redux-middleware-dynamically/"
      },
      {
        f: "/2018/03/start-nginx-when-upstream-unavailable/",
        t: "/start-nginx-when-upstream-unavailable/"
      },
      {
        f: "/2018/02/soap-call-in-clojure-compojure-with-saaj/",
        t: "/soap-call-in-clojure-compojure-with-saaj/"
      },
      {
        f: "/2017/09/using-network-call-in-react/",
        t: "/using-network-call-in-react/"
      },
      {
        f: "/2017/07/use-flyway-with-leiningen/",
        t: "/use flyway with leiningen/"
      },
      {
        f: "/2017/05/card_slider_using_css3/",
        t: "/card_slider_using_css3/"
      },
      {
        f: "/2017/05/store_function_inside_redux_store/",
        t: "/store_function_inside_redux_store/"
      },
      {
        f: "/2017/02/jest_test_toLocaleString_javasscript/",
        t: "/jest_test_toLocaleString_javasscript/"
      },
      {
        f: "/2016/09/expire_session_after_timeout_spring/",
        t: "/expire_session_after_timeout_spring/"
      },
      {
        f: "/2016/07/angular_resource_and_interceptors/",
        t: "/angular_resource_and_interceptors/"
      },
      {
        f: "/2016/06/post_errors_to_an_endpoint_angular/",
        t: "/post_errors_to_an_endpoint_angular/"
      },
      {
        f: "/2016/02/expanding_amazon_ebs_volumes/",
        t: "/expanding_amazon_ebs_volumes/"
      },
      {
        f: "/2016/01/capistrano_set_deployed_revision/",
        t: "/capistrano_set_deployed_revision/"
      },
      {
        f: "/2015/12/url_generation_error_after_upgrading_rails/",
        t: "/url_generation_error_after_upgrading_rails/"
      },
      {
        f: "/2015/05/add_ckeditor_to_rails_pipeline/",
        t: "/add_ckeditor_to_rails_pipeline/"
      },
      {
        f: "/2014/08/deploying-jekyll-blog-through-rake-script/",
        t: "/deploying-jekyll-blog-through-rake-script/"
      },
      {
        f: "/2014/07/integrating-netflix-hystrix-to-a-spring-application/",
        t: "/integrating-netflix-hystrix-to-a-spring-application/"
      },
      {
        f: "/2014/07/testing-apiary-using-github-travis/",
        t: "/testing-apiary-using-github-travis/"
      },
      {
        f: "/2014/06/making-https-call-using-apache-httpclient/",
        t: "/making-https-call-using-apache-httpclient/"
      },
      {
        f: "/2014/06/skeleton-gradle-spring-mvc-app/",
        t: "/skeleton-gradle-spring-mvc-app/"
      },
      {
        f: "/2014/06/cross-site-http-requests/",
        t: "/cross-site-http-requests/"
      },
      {
        f: "/2014/05/re-running-testng-failed-tests/",
        t: "/re-running-testng-failed-tests/"
      },
      {
        f: "/2014/04/wiring-jasmine2-with-phantom/",
        t: "/wiring-jasmine2-with-phantom/"
      },
      {
        f: "/2014/02/utc-time-android-device-ntp-server-sync/",
        t: "/utc-time-android-device-ntp-server-sync/"
      },
      {
        f: "/2013/11/castle-gorge-hiking-with-jhc/",
        t: "/castle-gorge-hiking-with-jhc/"
      },
      {
        f: "/2013/08/whats-new-in-apple-passbook-ios7/",
        t: "/whats-new-in-apple-passbook-ios7/"
      },
      {
        f: "/2013/07/setting-up-cucumber-jvm/",
        t: "/setting-up-cucumber-jvm/"
      },
      {
        f: "/2013/01/link-your-sublime-text-2-instances-with-dropbox/",
        t: "/link-your-sublime-text-2-instances-with-dropbox/"
      },
      {
        f: "/2012/12/scribblings-socket-io/",
        t: "/scribblings-socket-io/"
      },
      {
        f: "/2012/06/hamcrest-conflict-junit/",
        t: "/hamcrest-conflict-junit/"
      },
      {
        f: "/2012/06/handle-maxuploadsizeexceededexception-spring/",
        t: "/handle-maxuploadsizeexceededexception-spring/"
      },
      {
        f: "/2011/12/make_ntfs_write_mac_lion/",
        t: "/make_ntfs_write_mac_lion/"
      },
      {
        f: "/2011/11/running-windows-8-on-vm-on-mac-lion/",
        t: "/running-windows-8-on-vm-on-mac-lion/"
      },
      {
        f: "/2011/09/slot-machine-effect-jquery/",
        t: "/slot-machine-effect-jquery/"
      },
      {
        f: "/2011/09/writing-custom-tags-for-jstls/",
        t: "/writing-custom-tags-for-jstls/"
      },
      {
        f: "/2011/07/reloading-an-activity-in-android/",
        t: "/reloading-an-activity-in-android/"
      },
      {
        f: "/2011/07/configuring-context-name-for-an-applicationtomcat-war/",
        t: "/configuring-context-name-for-an-applicationtomcat-war/"
      },
      {
        f: "/2011/06/my-first-windows-7-theme/",
        t: "/my-first-windows-7-theme/"
      },
      {
        f: "/2011/05/primary-key-onetoone-mapping-in-hibernate/",
        t: "/primary-key-onetoone-mapping-in-hibernate/"
      },
      {
        f: "/2011/04/play-age-of-empires-aoe-in-windows-7/",
        t: "/play-age-of-empires-aoe-in-windows-7/"
      },
      {
        f: "/2011/04/wiring-android-wheel-widget-into-your-application/",
        t: "/wiring-android-wheel-widget-into-your-application/"
      },
      {
        f: "/2011/03/add-edittexts-dynamically-and-retrieve-values-android/",
        t: "/add-edittexts-dynamically-and-retrieve-values-android/"
      },
      {
        f: "/2011/01/test-your-controllers-modelattribute-methods/",
        t: "/test-your-controllers-modelattribute-methods/"
      },
      {
        f: "/2010/11/hadoop-version-in-aws-map-reduce/",
        t: "/hadoop-version-in-aws-map-reduce/"
      },
      {
        f: "/2010/11/install-custom-jar-files-in-samsung-corby-pro/",
        t: "/install-custom-jar-files-in-samsung-corby-pro/"
      },
      {
        f: "/2010/10/sax-parser-characters-method/",
        t: "/sax-parser-characters-method/"
      },
      {
        f: "/2010/08/ftp-client-ubuntu/",
        t: "/ftp-client-ubuntu/"
      },
      {
        f: "/2010/03/stop-halting-at-assertions/",
        t: "/stop-halting-at-assertions/"
      },
      {
        f: "/2010/02/send-your-mail-later/",
        t: "/send-your-mail-later/"
      },
      {
        f: "/2010/02/printing-multiple-divs-in-a-page/",
        t: "/printing-multiple-divs-in-a-page/"
      },
      {
        f: "/2009/12/tweaking-intellij-appearance-to-look-cool-in-ubuntu/",
        t: "/tweaking-intellij-appearance-to-look-cool-in-ubuntu/"
      },
      {
        f: "/2009/12/install-inconsolata-ttf-in-ubuntujaunty/",
        t: "/install-inconsolata-ttf-in-ubuntujaunty/"
      },
      {
        f: "/2009/11/enabling-yahoo-accounts-on-ubuntu/",
        t: "/enabling-yahoo-accounts-on-ubuntu/"
      },
      {
        f: "/2009/10/test-smtp-server/",
        t: "/test-smtp-server/"
      },
      {
        f: "/2009/08/first-post/",
        t: "/first-post/"
      }
    ];
    redirects.forEach(({ f, t }) => {
      createRedirect({
        fromPath: f,
        isPermanent: true,
        redirectInBrowser: true,
        toPath: t
      });
    });

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: { id: { regex: "//posts|pages//" }, frontmatter: { draft: { ne: true } } }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create posts and pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          const slug = edge.node.fields.slug;
          const isPost = /posts/.test(edge.node.id);
          createPage({
            path: slug,
            component: isPost ? postTemplate : pageTemplate,
            context: {
              slug: slug
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "build-javascript":
      {
        let components = store.getState().pages.map(page => page.componentChunkName);
        components = _.uniq(components);
        config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
          {
            name: `commons`,
            chunks: [`app`, ...components],
            minChunks: (module, count) => {
              const vendorModuleList = []; // [`material-ui`, `lodash`];
              const isFramework = _.some(
                vendorModuleList.map(vendor => {
                  const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
                  return regex.test(module.resource);
                })
              );
              return isFramework || count > 1;
            }
          }
        ]);
        // config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
        //   {
        //     analyzerMode: "static",
        //     reportFilename: "./report/treemap.html",
        //     openAnalyzer: true,
        //     logLevel: "error",
        //     defaultSizes: "gzip"
        //   }
        // ]);
      }
      break;
  }
  return config;
};

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([`syntax-dynamic-import`, `dynamic-import-webpack`])
  };
};
