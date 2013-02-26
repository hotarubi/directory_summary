counter = DirectoryCounter.new(ARGV)
puts SummaryPrinter.new(counter.count).print