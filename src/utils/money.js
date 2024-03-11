import bigDecimal from 'js-big-decimal'
/**
 *  传入的金额数字格式化
 * @param value 需要格式化的值
 * @param precision 精度位 默认2
 * @returns {*}
 */
export function money(value, precision = 2) {
  // eslint-disable-next-line
  if ([0, 0.0, 0.00, '0', '0.0', '0.00'].indexOf(value) > -1) return '0.00'
  if (!value) return value
  if (value.toString().match(',')) return value
  if (value.toString().match(/-{0,1}[\d.]/g)) {
    value = bigDecimal.round(value, +precision).replace(/^0+(?!\.)/, '').replace(/(\-)0+(?!\.)/, '-')
    value = value.split('.')[0].replace(/\B(?=([\d]{3})+\b)/g, ',') + '.' + (value.split('.')[1] || '00')
    return value
  }
  return value
}
