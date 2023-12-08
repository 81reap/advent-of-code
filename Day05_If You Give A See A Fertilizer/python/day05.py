import re
		
def apply_map_to_range(curr_range, sparse_map):
	ouput_ranges = []

	for fx in sparse_map:
		dst = fx[0]
		src = fx[1]
		length = fx[2]

		fx_range = range(src, src+length)

		if len(curr_range) == 0:
			break

		intersect_start = max(curr_range[0], fx_range[0])
		intersect_end = min(curr_range[-1]+1, fx_range[-1]+1)
		intersect = range(intersect_start, intersect_end)

		if len(intersect) != 0:
			before_range = range(curr_range[0], intersect[0])
			if len(before_range) != 0:
				ouput_ranges.append(before_range)

			delta = intersect[0] - src
			translate_start = dst + delta
			translate_end = translate_start + len(intersect)
			translated_range = range(translate_start, translate_end)
			ouput_ranges.append(translated_range)

			curr_range = range(intersect[-1]+1, curr_range[-1]+1)

	if len(curr_range) != 0:
		ouput_ranges.append(curr_range)
	return ouput_ranges

def create_sparse_map(text) -> []:
	lines = text.split("\n")[1:]
	sparse_map = []

	for line in lines :
		parsed_line = re.findall("[0-9]+", line)
		dest_start = int(parsed_line[0])
		src_start = int(parsed_line[1])
		range_len = int(parsed_line[2])

		sparse_map.append([dest_start, src_start, range_len])

	sparse_map.sort(key=lambda x:x[1])
	return sparse_map

def iterate_over_batchs(batchs, sparse_map):
	out_batchs = []
	for batch in batchs:
		out_batchs.extend(apply_map_to_range(batch, sparse_map))
	return out_batchs

def caluclate_min(seed_batches, soil, fertilizer, water, light, temp, humidity, loc):
	soil_batches = iterate_over_batchs(seed_batches, soil)
	fertilizer_batches = iterate_over_batchs(soil_batches, fertilizer)
	water_batches = iterate_over_batchs(fertilizer_batches, water)
	light_batches = iterate_over_batchs(water_batches, light)
	temp_batches = iterate_over_batchs(light_batches, temp)
	humidity_batches = iterate_over_batchs(temp_batches, humidity)
	loc_batches = iterate_over_batchs(humidity_batches, loc)

	out = loc_batches[0][0]
	for batch in loc_batches[1:]:
		out = min(out, batch[0])
	return out

if "__main__" == __name__:
	file = open('../input.txt')
	sections = file.read().split("\n\n")

	num = re.findall("[0-9]+", sections[0])
	seed_batches_part1 = [range(int(num[i]), int(num[i])+1) for i in range(0, len(num))]
	seed_batches_part2 = [range(int(num[i]), int(num[i])+int(num[i+1])) for i in range(0, len(num), 2)]

	soil = create_sparse_map(sections[1])
	fertilizer = create_sparse_map(sections[2])
	water = create_sparse_map(sections[3])
	light = create_sparse_map(sections[4])
	temp = create_sparse_map(sections[5])
	humidity = create_sparse_map(sections[6])
	loc = create_sparse_map(sections[7])

	print("part 1", caluclate_min(seed_batches_part1, soil, fertilizer, water, light, temp, humidity, loc))
	print("part 2", caluclate_min(seed_batches_part2, soil, fertilizer, water, light, temp, humidity, loc))
