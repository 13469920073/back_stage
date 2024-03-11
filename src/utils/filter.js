const fifle = {
  // 币种
  'CurrencyList': {
    'Total': '全部',
    'CNY': '人民币',
    'GBP': '英镑',
    'HKD': '港币',
    'USD': '美元',
    'CHF': '瑞士法郎',
    'DEM': '德国马克',
    'FRF': '法国法郎',
    'SGD': '新加坡元',
    'SWK': '瑞典克朗',
    'DKK': '丹麦克朗',
    'NOK': '挪威克朗',
    'ITL': '意大利里拉',
    'JPY': '日元',
    'CAD': '加拿大元',
    'AUD': '澳大利亚元',
    'EUR': '欧元',
    'NZD': '新西兰元',
    '01': '人民币',
    '12': '英镑',
    '13': '港币',
    '14': '美元',
    '27': '日元'
  },
  'StatusList': {
    '1': '未认证',
    '2': '审核中',
    '3': '通过',
    '4': '不通过'
  },
  'AcctStatusList': {
    '0': '正常',
    '1': '停用'
  }
}
export default function dist(key, item) {
  for (const val in fifle) {
    if (item === val) {
      return fifle[item][key]
    }
  }
}

