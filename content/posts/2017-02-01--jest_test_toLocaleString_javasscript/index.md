---
title: Mock toLocaleString in Jest
menuTitle: Mock toLocaleString in Jest
subTitle: Found an issue while testing toLocaleString and other related JS prototype function. Described here is the way to mock them.
postDescription: Found an issue while testing toLocaleString and other related JS prototype function. Described here is the way to mock them.
category: Javascript,Jest,React
---
We had to use toLocaleString with a specific country-code. toLocaleString('de'). This works perfectly in all the browsers. However, not in jest tests.

Our Jest tests were running with \--env=jsdom. I got to know that jsdom and phantomJS aren't supporting multiple locale implementations.

[PhantomJS support locale-specific.](https://github.com/ariya/phantomjs/issues/12327)

So, the only solution I found is to mock these methods and test rest of the logic. Here is a sample mock behaviour.

**Note:** This behaviour is applicable for toLocaleDateString() toLocaleTimeString()