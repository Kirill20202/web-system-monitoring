CC = gcc
CFLAGS = -Wall -O2
SRC_DIR = src
BIN_DIR = bin
TARGET_UPTIME = $(BIN_DIR)/sys_uptime
TARGET_LOADAVG = $(BIN_DIR)/sys_loadavg

build: $(TARGET_UPTIME) $(TARGET_LOADAVG)

$(TARGET_UPTIME): $(SRC_DIR)/sys_uptime.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

$(TARGET_LOADAVG): $(SRC_DIR)/sys_loadavg.c
	@mkdir -p $(BIN_DIR)
	$(CC) $(CFLAGS) $< -o $@
	@echo "✅ Built: $@"

clean:
	rm -f $(TARGET_UPTIME) $(TARGET_LOADAVG)

.PHONY: build clean