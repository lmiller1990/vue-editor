function isModifier (keyCode) {
  if (keyCode == 13)
    return 'newline'
}

function isPrintableKey (keyCode, meta, ctrl) {
  var valid =
    (keyCode > 47 && keyCode < 58)   || // number keys
    keyCode == 32                    || // spacebar & return key(s)
    (keyCode > 64 && keyCode < 91)   || // letter keys
    (keyCode > 95 && keyCode < 112)  || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223);   // [\]' (in order)

    return (valid && !meta && !ctrl)
}

function meta (keyCode) {
  if (keyCode == 221) // right square bracket
    return 'Go to end of line'
}

export { isModifier, isPrintableKey, meta }
