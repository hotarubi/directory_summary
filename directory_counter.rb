class DirectoryCounter
  def initialize(argv)
    @path, @recursive = argv[0], false if argv.length == 1
    @path, @recursive = argv[1], argv[0] == '-r' if argv.length > 1
    @map = { }
  end
  
  def count(path = @path)
    filter = lambda {|p| p =~ /^(.+\.)*[^\.]+$/ } # only files start not with dot
    Dir.entries(path).select(&filter).each do |filename|
      full_path = "#{path}/#{filename}"
      count full_path if @recursive && File.directory?(full_path)
      accumulate File.new(full_path) unless File.directory?(full_path)
    end
    @map
  end
  
  private
  def accumulate(file)
    extname = File.extname(file.path)[1..-1]
    size = File.size file.path
    list = @map[extname] || { 'num' => 0, 'total' => 0, 'max' => 0, 'min' => nil }
    list['num'] += 1
    list['total'] += size
    list['max'] = [list['max'], size].max
    list['min'] = list['min'] ? [list['min'], size].min : size
    @map[extname] = list
  end
end