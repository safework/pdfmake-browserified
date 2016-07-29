require 'ttfunk'

file = TTFunk::File.open("tick-cross.ttf")
cmap = file.cmap

chars = {}
unicode_chars = []

cmap.tables.each do |subtable|
  next if !subtable.unicode?
  chars = chars.merge( subtable.code_map )
end

unicode_chars = chars.keys.map{ |dec| dec.to_s(16) }

puts "\n -- Found #{unicode_chars.length} characters in this font \n\n"
p unicode_chars
