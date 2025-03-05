import type { SovendusLaunchpadConfig } from "./src";

const config: SovendusLaunchpadConfig = {
  packages: {
    "integrations": {
      "web": {
        "magento": {
          "magento-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Magento-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
          "testing-docker": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/magento-docker-testing-instance",
          },
        },
        "shopify": {
          "shopify-app": {
            branch: "main",
            repoUrl: "https://gitlab.sovendus.com/dev/shopify-app.git",
          },
          "shopify-script-old": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Shopify-Voucher-Network-and-Checkout-Benefits-Documentation",
          },
          "shopify-getback-app": {
            branch: "main",
            repoUrl: "",
          },
          "shopify-app-docs": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-App-for-Shopify",
          },
          "shopify-cp-script-standalone": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Checkout-Products-Postback-Integration-for-Shopify",
          },
        },
        "wordpress": {
          "wordpress-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Wordpress-WooCommerce-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
        },
        "vue": {
          "vue-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-Vue",
          },
        },
        "svelte": {
          "svelte-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-Svelte",
          },
        },
        "recharge-checkout": {
          "recharge-script": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Recharge-Voucher-Network-and-Checkout-Benefits-Documentation",
          },
        },
        "shopware": {
          "shopware-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Shopware-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
        },
        "react": {
          "react-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-React/",
          },
        },
        "prestashop": {
          "prestashop-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Prestashop-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
        },
        "oxid": {
          "oxid-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Oxid-eShop-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
        },
        "jtl": {
          "jtl-plugin": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-JTL-Voucher-Network-and-Checkout-Benefits-Plugin",
          },
          "jtl-testing-instance": {
            branch: "main",
            repoUrl:
              "https://github.com/sov-brandstaetter/docker-jtl-shop-stack",
          },
        },
        "gtm": {
          "gtm-template-old": {
            branch: "main",
            repoUrl: "https://github.com/Sovendus-GmbH/Sovendus-GTM-v2",
          },
          "sovendus-landing-page-gtm-tag": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/sovendus-landing-page-gtm-tag",
          },
          "sovendus-gtm-tag": {
            branch: "main",
            repoUrl: "https://github.com/Sovendus-GmbH/sovendus-gtm-tag",
          },
          "gtm-checkout-products-template-old": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/sovendus_select_product_tracking_template",
          },
        },
        "bigcommerce": {
          "bigcommerce-script": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-BigCommerce-Voucher-Network-and-Checkout-Benefits-Documentation",
          },
        },
        "angularjs": {
          "angularjs-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-AngularJS/",
          },
        },
        "angular": {
          "angular-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Component-for-Angular",
          },
        },
        "default-generic-script": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Sovendus-generic-documentation-for-Voucher-Network-and-Checkout-Benefits",
        },
      },
      "api": {
        "coupon-redemption-api": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Coupon-Redemption-API-for-Sovendus-Voucher-Network-and-Checkout-Benefits",
        },
        "events-api": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Sovendus-Events-API-for-Voucher-Network-and-Checkout-Benefits",
        },
        "csp-documentation": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Sovendus-CSP-for-Voucher-Network-and-Checkout-Benefits",
        },
      },
      "app": {
        "flutter": {
          "flutter-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Voucher-Network-and-Checkout-Benefits-Documentation-for-Flutter-Apps",
          },
          "flutter-testing-app": {
            branch: "main",
            repoUrl: "https://github.com/sov-brandstaetter/flutter-test",
          },
        },
        "react-native": {
          "react-native-component": {
            branch: "main",
            repoUrl:
              "https://github.com/Sovendus-GmbH/Sovendus-Component-for-React-Native",
          },
        },
        "webview-based": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Sovendus-Generic-WebView-App-Integration-Voucher-Network-and-Checkout-Benefits",
        },
        "native-webview": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/Sovendus-Generic-native-App-Integration-Voucher-Network-and-Checkout-Benefits",
        },
      },
      "sovendus-plugins-core": {
        "sovendus-integration-types": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/sovendus-integration-types",
        },
        "sovendus-integration-scripts": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/sovendus-integration-scripts",
        },
        "sovendus-integration-settings-ui": {
          branch: "main",
          repoUrl:
            "https://github.com/Sovendus-GmbH/sovendus-integration-settings-ui",
        },
      },
    },
    "developer-hub": {
      branch: "main",
      repoUrl: "https://gitlab.sovendus.com/dev/developer-hub.git",
    },
    "sovendus-integrations": {
      branch: "main",
      repoUrl: "https://gitlab.sovendus.com/dev/sovendus-integrations.git",
    },
    "sovendus-deploy": {
      "envctl": {
        branch: "main",
        repoUrl: "https://gitlab.sovendus.com/shared/envctl.git",
      },
      "deployment-dev": {
        branch: "main",
        repoUrl: "https://gitlab.sovendus.com/deploy_test/deployment-dev.git",
      },
      "deployment-live": {
        branch: "main",
        repoUrl: "https://gitlab.sovendus.com/deploy_prod/deployment-live.git",
      },
      "deployment-testing": {
        branch: "main",
        repoUrl:
          "https://gitlab.sovendus.com/deploy_test/deployment-testing.git",
      },
    },
    "sovendus-hiring-tests": {
      branch: "main",
      repoUrl: "https://github.com/Sovendus-GmbH/Sovendus-Hiring-Tests",
    },
    "sovendus-tools": {
      "sovendus-builder": {
        branch: "main",
        repoUrl: "https://github.com/sov-brandstaetter/sovendus-builder",
      },
      "sovendus-release-tool": {
        branch: "main",
        repoUrl: "https://github.com/sov-brandstaetter/sovendus-release-tool",
      },
    },
  },
};

export default config;
