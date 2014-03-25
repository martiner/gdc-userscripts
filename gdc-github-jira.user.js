// ==UserScript==
// @name        gdc-github-jira
// @namespace   http://intgdc.com
// @description GDC GitHub JIRA integration
// @include     http://github.com/gooddata/*
// @include     https://github.com/gooddata/*
// @version     2
// @grant       none
// ==/UserScript==
textNodes = document.evaluate("//*[not(self::a) and not(self::textarea) and not(self::input) and not(self::title)]/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchRE = new RegExp('([A-Z]{3,}\-[0-9]{3,})','g');
var jiraReplacementDiv = document.createElement('div');
for (var i=0;i<textNodes.snapshotLength;i++) {
        var node = textNodes.snapshotItem(i);
        if(searchRE.test(node.data)) {
                jiraReplacementDiv.innerHTML = node.data.replace(searchRE, "<a href=\"https://jira.intgdc.com/browse/$1\">$1</a>");
                while (jiraReplacementDiv.firstChild) {
                node.parentNode.insertBefore(jiraReplacementDiv.firstChild, node);
        }
        node.parentNode.removeChild(node);
    }
}
