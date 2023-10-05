import Foundation

@objc public class AudioStreaming: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
