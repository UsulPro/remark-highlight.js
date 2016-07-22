import low from 'lowlight';
import visit from 'unist-util-visit';

export default function attacher (remark, {include, exclude} = {}) {
    function visitor (node) {
        const {lang} = node;
        if (
            !lang ||
            include && !~include.indexOf(lang) ||
            exclude && ~exclude.indexOf(lang)
        ) {
            return;
        }

        let {data} = node;

        if (!data) {
            node.data = data = {};
        }

        data.hChildren = low.highlight(lang, node.value).value;
        data.hProperties = data.hProperties || {};
        data.hProperties.className = [
            'hljs',
            ...data.hProperties.className || [],
            `language-${lang}`,
        ];
    }

    return ast => visit(ast, 'code', visitor);
}
