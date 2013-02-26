class SummaryPrinter
  def initialize(map)
    @map = map
  end
  
  def print
    @map.map {|k, v|
      <<-TEMPLATE.gsub(/^ {8}/, '')
        #{k}:
          number of files: #{v['num']}
          combined size: #{v['total']}
          largest file: #{v['max']}
          smallest file: #{v['min']}
      TEMPLATE
    }.sort.join
  end
end