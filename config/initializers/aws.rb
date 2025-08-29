Aws.config.update({
  region: 'ap-northeast-1',
  credentials: Aws::Credentials.new('dummy', 'dummy')
})

Dynamoid.configure do |config|
  # 名前空間を使わない（prefix を付けない）
  config.namespace = nil
end