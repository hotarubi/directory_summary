describe "output a summary of the files in the directory" do
  let(:pwd) { ENV['PWD'] }
  context "without -r argument" do
    subject { `ruby #{pwd}/directory_summary.rb #{pwd}/spec/fixtures` }
    it { should == File.read("#{pwd}/spec/expectations/non_recursive") }
  end
  
  context "with -r argument" do
    subject { `ruby #{pwd}/directory_summary.rb -r #{pwd}/spec/fixtures` }
    it { should == File.read("#{pwd}/spec/expectations/recursive") }
  end
end