module.exports = {
    port: 8080,
    browserList : [
      'edge >= 13',
      'ie >= 10',
      'ChromeAndroid >= 4',
      'firefox >= 57',
      'Chrome >= 51',
      'Safari >= 9',
      'iOS >= 8',
      'Android >= 4',
      'and_chr >= 51'
    ],
    encodeOptions : {
      newline: "crlf",
      encoding: "utf8"
    },
    htmlBeautifyOptions : {
      "indent_size": 2,
      "indent_char": " ",
      "indent_level": 0,
      "indent_with_tabs": false,
      "preserve_newlines": false,
      "max_preserve_newlines": 10,
      "jslint_happy": false,
      "space_after_anon_function": false,
      "brace_style": "collapse",
      "keep_array_indentation": false,
      "keep_function_indentation": false,
      "space_before_conditional": true,
      "break_chained_methods": false,
      "eval_code": false,
      "unescape_strings": false,
      "wrap_line_length": 0,
      "wrap_attributes": "auto",
      "wrap_attributes_indent_size": 4,
      "end_with_newline": false
    },
    paths:{
      dist: '../.build/',
      src: '../_resource/'
    }
};