require './directory_counter'
require './summary_printer'

counter = DirectoryCounter.new(ARGV)
puts SummaryPrinter.new(counter.count).print