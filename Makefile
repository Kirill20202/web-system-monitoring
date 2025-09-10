CC = gcc
CFLAGS = -Wall -O2
SRC_DIR = src
BIN_DIR = bin

TARGETS = $(BIN_DIR)/sys_uptime $(BIN_DIR)/sys_loadavg $(BIN_DIR)/sys_meminfo $(BIN_DIR)/sys_top

$(BIN_DIR)/sys_uptime: $(SRC_DIR)/sys_uptime.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

$(BIN_DIR)/sys_loadavg: $(SRC_DIR)/sys_loadavg.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

$(BIN_DIR)/sys_meminfo: $(SRC_DIR)/sys_meminfo.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

$(BIN_DIR)/sys_top: $(SRC_DIR)/sys_top.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

build: $(TARGETS)

clean:
	rm -f $(TARGETS)

.PHONY: build clean